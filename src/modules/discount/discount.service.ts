import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Discount } from 'src/submodules/models/DiscountModel/Discount';
import { DiscountModel } from './discount.shema';
import { ResponseError } from 'src/helpers/ResponseError';

@Injectable()
export class DiscountService {
    async GetAll(props) {
        let limit = props.limit || 6;
        const page = props.page || 1;
        const limited = Number(limit);
        const offset = (Number(page) - 1) * limited;
        const discountData = await DiscountModel.findAll({
            where: {},
            limit: limited,
            offset: offset,
        });
        return discountData;
    }

    async createDiscount(props: Discount): Promise<Discount> {
        const findOne = await DiscountModel.findOne({
            where: { code: props.code },
        });
        if (findOne) {
            throw ResponseError.badInput('Discount already exits');
        }
        props.code = props.code.toUpperCase();
        const discount = await DiscountModel.create(props);
        return discount;
    }
    async getOneUpdateDiscount(id: number) {
        const discount = await DiscountModel.findOne({
            where: {
                id: id,
            },
        });
        if (!discount) throw ResponseError.notFound('discount not found');
        return discount;
    }

    async updateDiscount(id: number, discount: Partial<Discount>) {
        try {
            const updated = await DiscountModel.update(discount, {
                where: { id: id },
            });
            return updated;
        } catch (error) {
            throw ResponseError.badInput(error.message);
        }
    }

    async removeDiscount(id) {
        DiscountModel.destroy({
            where: { id: id },
        });
    }
}