import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "./news.entity";
import { CreateNewsDto } from "./dto/create-news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>
    ) {}

    create(createNewsDto: CreateNewsDto): Promise<News> {
        const news = new News();
        news.title = createNewsDto.title;
        news.content = createNewsDto.content;
        news.creation = new Date().toISOString().slice(0, 19).replace('T', ' ');

        return this.newsRepository.save(news);
    }

    async findAll(): Promise<News[]> {
        return this.newsRepository.find();
    }

    findOne(id: string): Promise<News> {
        return this.newsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.newsRepository.delete(id);
    }
}
