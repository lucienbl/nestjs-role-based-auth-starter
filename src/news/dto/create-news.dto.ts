import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}
