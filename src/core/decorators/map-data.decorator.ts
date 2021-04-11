/*
 * Copyright (c) 2021 Lucien Blunk-Lallet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ClassConstructor, ClassTransformer } from "class-transformer";

// part of this comes from the class-transform library, I just added array transform support
export function MapData<T>(
  classType: ClassConstructor<T>,
): MethodDecorator {
  return function (target: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor): void {
    const classTransformer: ClassTransformer = new ClassTransformer();
    const originalMethod = descriptor.value;

    const transform = (data: any[] | any) => {
      if (Array.isArray(data)) {
        return data.map(_d => classTransformer.plainToClass(classType, _d));
      }

      return classTransformer.plainToClass(classType, data);
    };

    descriptor.value = function (...args: any[]): Record<string, any> {
      const result: any = originalMethod.apply(this, args);
      const isPromise =
        !!result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function';
      return isPromise
        ? result.then((data: any) => transform(data))
        : transform(result);
    };
  };
}
