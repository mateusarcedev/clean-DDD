import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2025-07-10T00:00:00.000Z') }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2025-07-11T00:00:00.000Z') }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2025-07-12T00:00:00.000Z') }))


    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions.map(q => q.createdAt.toISOString())).toEqual([
      new Date('2025-07-12').toISOString(),
      new Date('2025-07-11').toISOString(),
      new Date('2025-07-10').toISOString()
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })


})