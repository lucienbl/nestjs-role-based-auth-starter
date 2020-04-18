import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from "./news.entity";

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
