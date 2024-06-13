import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import SuccessResponse from "types/success.interface";
import { Pagination } from "mongoose-paginate-ts";
import Success from "../../utils/success-response";
import { ProductModel } from "./product.model";
import { ProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel.name)
        private readonly productModel: Pagination<ProductModel>
    ) {}

    async getProducts(page: number, limit: number): Promise<SuccessResponse> {
        try {
            const data = await this.productModel.paginate({
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

    async createProduct(body: ProductDTO): Promise<SuccessResponse> {
        const {
            name_arm,
            name_eng,
            description_arm,
            description_eng,
            price,
            sale,
            available,
            collection_id,
            extra_info,
            filter_categories,
            filter_materials,
            filter_styles,
            filter_occasions,
            colors_and_images,
        } = body;

        try {
            const product = await this.productModel.create({
                name_arm,
                name_eng,
                description_arm,
                description_eng,
                price,
                sale,
                available,
                collection_id,
                extra_info,
                filter_categories,
                filter_materials,
                filter_styles,
                filter_occasions,
                colors_and_images,
                active: true,
            });

            return Success(true, "Successfully created", product);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }

    async updateProduct(id: string, body: ProductDTO): Promise<SuccessResponse> {
        const {
            name_arm,
            name_eng,
            description_arm,
            description_eng,
            price,
            sale,
            available,
            collection_id,
            extra_info,
            filter_categories,
            filter_materials,
            filter_styles,
            filter_occasions,
            colors_and_images,
        } = body;

        const product = await this.productModel.findById(id);
        if (product) {
            product.name_arm = name_arm;
            product.name_eng = name_eng;
            product.description_arm = description_arm;
            product.description_eng = description_eng;
            product.price = price;
            product.sale = sale;
            product.available = available;
            product.collection_id = collection_id;
            product.extra_info = extra_info;
            product.filter_categories = filter_categories;
            product.filter_materials = filter_materials;
            product.filter_styles = filter_styles;
            product.filter_occasions = filter_occasions;
            product.colors_and_images = colors_and_images;

            await product.save();
            return Success(true, "Successfully updated", product);
        } else {
            return Success(false, "Something went wrong", null);
        }
    }

    async deleteProduct(id: string): Promise<SuccessResponse> {
        try {
            await this.productModel.findByIdAndDelete(id);
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, "Something went wrong", null);
        }
    }
}
