import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepository implements QuestionsCommentRepository {
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComment = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

}