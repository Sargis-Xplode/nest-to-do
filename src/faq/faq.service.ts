import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import { FAQModel } from "./faq.model";
import { FAQDTO } from "./dto/faq.dto";
import { Pagination } from "mongoose-paginate-ts";
import Success from "../../utils/success-response";

@Injectable()
export class FAQService {
    constructor(
        @InjectModel(FAQModel.name)
        private readonly faqModel: Pagination<FAQModel>
    ) {}

    async getFAQ(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const data = await this.faqModel.paginate({
                limit,
                page,
                sort: {
                    createdAt: -1,
                },
            });
            return Success(true, "Successful", data);
        } catch (err) {
            return Success(false, "Unsuccessful", null);
        }
    }

    async createFAQ(body: FAQDTO) {
        const { question_arm, question_eng, answer_arm, answer_eng, category } = body;

        const faq = await this.faqModel.create({
            question_arm,
            question_eng,
            answer_arm,
            answer_eng,
            category,
        });
        if (faq) {
            return Success(true, "Successfully created", faq);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateFAQ(id: string, body: FAQDTO) {
        const { question_arm, question_eng, answer_arm, answer_eng } = body;

        const faq = await this.faqModel.findById(id);
        if (faq) {
            faq.question_arm = question_arm;
            faq.question_eng = question_eng;
            faq.answer_arm = answer_arm;
            faq.answer_eng = answer_eng;

            await faq.save();
            return Success(true, "Successfully updated", faq);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async deleteFAQ(id: string): Promise<SuccessResponse> {
        try {
            await this.faqModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
