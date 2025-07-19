import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answers Comments', async () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityID('answer-1')
    }))


    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)

  })

  it('should be able to fetch paginated answer comments', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      }))
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })


})
