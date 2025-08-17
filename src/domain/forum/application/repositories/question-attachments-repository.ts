import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'


export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
