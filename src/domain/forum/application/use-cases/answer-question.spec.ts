import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('create a questin', async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da pergunta',
    })


    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})