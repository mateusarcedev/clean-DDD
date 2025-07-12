import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswersUseCaseResponse { }

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answerId)

    if (!answers) {
      throw new Error('Answers not found.')
    }

    if (authorId !== answers.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answers)

    return {}
  }
}
