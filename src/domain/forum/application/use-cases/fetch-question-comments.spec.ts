import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Questions Comments', async () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))


    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)

  })

  it('should be able to fetch paginated question comments', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
      }))
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })


})
