# 🤝 Contributing to VibeCode Bible

## 🕉️ Философия участия

> _"Локах самастах сукхино бхаванту"_ - "Пусть все существа будут счастливы"

VibeCode Bible - это больше чем код. Это философия осознанной разработки, где каждая строка кода написана с мудростью и состраданием.

## 🚀 Как начать участвовать

### 1. Настройка среды разработки

```bash
# Клонируем репозиторий
git clone https://github.com/your-repo/bible-vibecoder.git
cd bible-vibecoder

# Устанавливаем зависимости
bun install

# Настраиваем окружение
cp .env.example .env
# Отредактируйте .env с вашими настройками

# Проверяем что все работает
bun run typecheck
bun run test
bun run lint
```

### 2. Workflow разработки

Мы следуем **священному циклу TDD**:

```bash
# 1. Создаем ветку для функции
git checkout -b feat/amazing-feature

# 2. Пишем падающий тест (🔴)
bun run tdd src/__tests__/your-feature.test.ts

# 3. Следуем циклу Red → Green → Refactor
# Скрипт tdd поможет вам в этом

# 4. Проверяем качество
bun run typecheck && bun run lint && bun run test

# 5. Коммитим с осознанным сообщением
git commit -m "feat: add amazing feature with conscious implementation"

# 6. Создаем Pull Request
```

## 📋 Стандарты кода

### TypeScript & Качество

- ✅ **Строгая типизация** - никаких `any`
- ✅ **Чистые функции** - предсказуемые и тестируемые
- ✅ **Осознанное именование** - имена отражают суть
- ✅ **TDD подход** - тесты ведут разработку

### Архитектурные принципы

```typescript
// ✅ Хорошо - чистая функция
export const createWisdomMessage = (content: string): WisdomMessage => ({
  content: content.trim(),
  timestamp: new Date(),
  type: 'wisdom',
});

// ❌ Плохо - мутирует состояние
export const updateGlobalCounter = () => {
  globalCounter++; // Побочный эффект
};
```

### Commit Convention

Используем [Conventional Commits](https://conventionalcommits.org/):

```
feat: add meditation mode for coding sessions
fix: resolve telegram message parsing issue
docs: update contributing guidelines
test: add coverage for wizard scenes
refactor: simplify button handler logic
```

## 🧪 Тестирование

### Обязательные тесты

- **Unit тесты** для всех утилит и сервисов
- **Integration тесты** для важных потоков
- **E2E тесты** для пользовательских сценариев

```typescript
// Пример качественного теста
describe('WisdomService', () => {
  it('should generate enlightened code suggestions', async () => {
    const service = new WisdomService();
    const suggestion = await service.generateSuggestion('refactor this chaos');

    expect(suggestion).toMatchObject({
      wisdom: expect.stringContaining('simplicity'),
      actionable: true,
      consciousness_level: expect.any(Number),
    });
  });
});
```

## 📁 Структура проекта

Придерживайтесь нашей священной структуры:

```
src/
├── services/       # Бизнес-логика (чистые сервисы)
├── utils/         # Утилиты (чистые функции)
├── types/         # TypeScript типы
├── __tests__/     # Тесты (зеркало структуры src/)
└── adapters/      # Внешние интеграции
```

## 🔄 Pull Request Process

### Checklist перед созданием PR:

- [ ] ✅ Все тесты проходят (`bun run test`)
- [ ] 🎯 TypeScript компилируется (`bun run typecheck`)
- [ ] 🧹 Код отлинтован (`bun run lint`)
- [ ] 📖 Документация обновлена (если нужно)
- [ ] 🧪 Покрытие тестами не снизилось
- [ ] 🕉️ Код написан осознанно и чисто

### Template для PR:

```markdown
## 🎯 Что делает этот PR

Краткое описание изменений

## 🧪 Как тестировать

Шаги для проверки изменений

## 📋 Checklist

- [ ] Тесты добавлены/обновлены
- [ ] Документация обновлена
- [ ] TypeScript типы корректны
- [ ] Следует принципам VibeCode
```

## 🤔 Нужна помощь?

### Каналы поддержки:

- 💬 **Issues** - для багов и предложений
- 🧘‍♂️ **Discussions** - для философских вопросов о коде
- 📚 **Wiki** - для расширенной документации

### Типы вкладов:

- 🐛 **Bug fixes** - исправление ошибок
- ✨ **Features** - новая функциональность
- 📖 **Documentation** - улучшение документации
- 🧪 **Tests** - расширение покрытия тестами
- 🎨 **UI/UX** - улучшение пользовательского опыта
- 🔧 **Tooling** - улучшение инструментов разработки

## 🙏 Кодекс поведения

Мы придерживаемся принципов **ахимсы** (ненасилия) в общении:

- 💝 **Будьте добры** - каждый участник ценен
- 🤝 **Помогайте новичкам** - мы все когда-то начинали
- 🧘‍♂️ **Сохраняйте спокойствие** - конфликты решаются мирно
- 🌱 **Растите вместе** - обучение через взаимодействие

---

🕉️ **Помните: каждый коммит - это акт творения. Творите осознанно!**
