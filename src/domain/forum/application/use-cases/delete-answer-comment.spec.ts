import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'


let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('1')
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: '2'
      })
    }).rejects.toBeInstanceOf(Error)

  })

})