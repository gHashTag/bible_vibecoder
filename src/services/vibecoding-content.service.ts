import * as fs from 'fs';
import * as path from 'path';
import { VibeCodingContent, CarouselSlide } from '../types/index';
import { logger } from '../utils/logger';
import { VibeCodingSearchOptions } from '../types';

export enum ContentType {
  TEXT = 'text',
  CAROUSEL = 'carousel',
  VIDEO = 'video',
  AUDIO = 'audio',
}

/**
 * 🕉️ Сервис для работы с контентом Vibecoding
 */
export class VibeCodingContentService {
  private readonly _vibeCodingPath: string;

  constructor() {
    this._vibeCodingPath = path.join(process.cwd(), 'vibecoding');
  }

  /**
   * 🔍 Поиск файлов по ключевым словам
   */
  async searchByKeywords(
    keywords: string[],
    options: {
      categories?: string[];
      sectionTypes?: string[];
      limit?: number;
    } = {}
  ): Promise<
    Array<{
      file: string;
      content: string;
      relevanceScore: number;
      category: string;
      sectionType: string;
    }>
  > {
    const results: Array<{
      file: string;
      content: string;
      relevanceScore: number;
      category: string;
      sectionType: string;
    }> = [];
    const allFiles = this.getAllMarkdownFiles();

    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const score = this.calculateRelevanceScore(content, keywords);

      if (score > 0) {
        const category = this.extractCategory(file);
        const sectionType = this.extractSectionType(content);

        if (
          (!options.categories || options.categories.includes(category)) &&
          (!options.sectionTypes || options.sectionTypes.includes(sectionType))
        ) {
          results.push({
            file,
            content,
            relevanceScore: score,
            category,
            sectionType,
          });
        }
      }
    }

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, options.limit || 10);
  }

  /**
   * 📊 Анализ контента для генерации карусели
   */
  async analyzeForCarousel(
    topic: string,
    searchResults: any[]
  ): Promise<VibeCodingContent> {
    logger.info('Анализируем контент для карусели', {
      data: { topic },
    });

    // Объединяем весь релевантный контент
    const combinedContent = searchResults
      .map(result => result.content)
      .join('\n\n');

    // Генерируем слайды на основе контента
    const slides = this.generateSlidesFromContent(combinedContent, topic);

    return {
      title: `Карусель: ${topic}`,
      slides,
    };
  }

  /**
   * 🎨 Генерация слайдов из контента
   */
  private generateSlidesFromContent(
    content: string,
    topic: string
  ): CarouselSlide[] {
    const slides: CarouselSlide[] = [];

    // Заголовочный слайд
    slides.push({
      title: topic,
      content: `Изучаем ${topic} через призму VibeCoding философии`,
      order: 1,
      type: 'title',
    });

    // Извлекаем ключевые принципы
    const principles = this.extractPrinciples(content);
    principles.forEach((principle, index) => {
      slides.push({
        title: `Принцип ${index + 1}`,
        content: principle,
        order: slides.length + 1,
        type: 'principle',
      });
    });

    // Извлекаем практические советы
    const practices = this.extractPractices(content);
    practices.forEach((practice, index) => {
      slides.push({
        title: `Практика ${index + 1}`,
        content: practice,
        order: slides.length + 1,
        type: 'practice',
      });
    });

    // Извлекаем цитаты
    const quotes = this.extractQuotes(content);
    if (quotes.length > 0) {
      slides.push({
        title: 'Мудрость',
        content: quotes[0],
        order: slides.length + 1,
        type: 'quote',
      });
    }

    // Заключительный слайд
    slides.push({
      title: 'Заключение',
      content: `Применяйте эти знания в своей практике программирования`,
      order: slides.length + 1,
      type: 'conclusion',
    });

    return slides.slice(0, 8); // Ограничиваем до 8 слайдов
  }

  /**
   * 📂 Получение всех markdown файлов
   */
  private getAllMarkdownFiles(): string[] {
    const files: string[] = [];

    const scanDirectory = (dir: string) => {
      try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (item.endsWith('.md')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        // Игнорируем ошибки доступа к директориям
      }
    };

    if (fs.existsSync(this._vibeCodingPath)) {
      scanDirectory(this._vibeCodingPath);
    }

    return files;
  }

  /**
   * 🎯 Расчет релевантности контента
   */
  private calculateRelevanceScore(content: string, keywords: string[]): number {
    const lowerContent = content.toLowerCase();
    let score = 0;

    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      const matches = (lowerContent.match(new RegExp(lowerKeyword, 'g')) || [])
        .length;
      score += matches;
    }

    return score;
  }

  /**
   * 🏷️ Извлечение категории из пути файла
   */
  private extractCategory(filePath: string): string {
    const pathParts = filePath.split(path.sep);
    if (pathParts.includes('fundamentals')) return 'fundamentals';
    if (pathParts.includes('practices')) return 'practices';
    if (pathParts.includes('tools')) return 'tools';
    if (pathParts.includes('development')) return 'development';
    if (pathParts.includes('analytics')) return 'analytics';
    if (pathParts.includes('archive')) return 'archive';
    if (pathParts.includes('main_book')) return 'main_book';
    if (pathParts.includes('philosophy')) return 'philosophy';
    return 'general';
  }

  /**
   * 📝 Извлечение типа секции из контента
   */
  private extractSectionType(content: string): string {
    if (content.includes('# ')) return 'chapter';
    if (content.includes('## ')) return 'section';
    if (content.includes('### ')) return 'subsection';
    if (content.includes('```')) return 'code_example';
    if (content.includes('> ')) return 'quote';
    return 'text';
  }

  /**
   * 🧠 Извлечение принципов из контента
   */
  private extractPrinciples(content: string): string[] {
    const principles: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (
        line.includes('принцип') ||
        line.includes('правило') ||
        line.includes('закон')
      ) {
        const cleaned = line.replace(/^[#*->\s]+/, '').trim();
        if (cleaned.length > 10 && cleaned.length < 200) {
          principles.push(cleaned);
        }
      }
    }

    return principles.slice(0, 3);
  }

  /**
   * 🛠️ Извлечение практик из контента
   */
  private extractPractices(content: string): string[] {
    const practices: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (
        line.includes('практика') ||
        line.includes('упражнение') ||
        line.includes('техника') ||
        line.includes('метод')
      ) {
        const cleaned = line.replace(/^[#*->\s]+/, '').trim();
        if (cleaned.length > 10 && cleaned.length < 200) {
          practices.push(cleaned);
        }
      }
    }

    return practices.slice(0, 3);
  }

  /**
   * 💬 Извлечение цитат из контента
   */
  private extractQuotes(content: string): string[] {
    const quotes: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (line.startsWith('> ')) {
        const cleaned = line.replace('> ', '').trim();
        if (cleaned.length > 20 && cleaned.length < 250) {
          quotes.push(cleaned);
        }
      }
    }

    return quotes.slice(0, 1);
  }

  /**
   * 🎯 Генерация контента по типу
   */
  async generateContent(
    topic: string,
    contentType: ContentType
  ): Promise<VibeCodingContent> {
    const searchResults = await this.searchByKeywords([topic], { limit: 5 });

    if (contentType === ContentType.CAROUSEL) {
      return this.analyzeForCarousel(topic, searchResults);
    }

    if (contentType === ContentType.TEXT) {
      return {
        title: topic,
        slides: [
          {
            title: topic,
            content: this.generateTextContent(searchResults),
            order: 1,
            type: 'text',
          },
        ],
      };
    }

    return {
      title: `Неподдерживаемый тип контента: ${topic}`,
      slides: [
        {
          title: 'Ошибка',
          content: 'Этот тип контента еще не поддерживается.',
          order: 1,
          type: 'text',
        },
      ],
    };
  }

  /**
   * 📝 Генерация текстового контента
   */
  private generateTextContent(
    searchResults: Array<{
      file: string;
      content: string;
      relevanceScore: number;
      category: string;
    }>
  ): string {
    const combinedContent = searchResults
      .map(result => result.content)
      .join('\n\n');
    const principles = this.extractPrinciples(combinedContent).join('\n- ');
    const practices = this.extractPractices(combinedContent).join('\n- ');

    return `
      Основные принципы:\n- ${principles}\n\n
      Основные практики:\n- ${practices}
    `.trim();
  }
}
