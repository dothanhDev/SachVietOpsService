import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/guard/jwtGuard';
import { Product, TProduct, TProductResponse } from 'src/submodules/models/ProductModel/Product';
import { ProductService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Public()
    @UseInterceptors(CacheInterceptor)
    @Post('filter')
    async findAll(@Body() props): Promise<TProductResponse> {
        return this.productService.findAll(props);
    }

    @Public()
    @UseInterceptors(CacheInterceptor)
    @Get(':id')
    async findOne(@Param('id') slug: string): Promise<Product> {
        return this.productService.findOneWithRelatedProducts(slug);
    }

    @Public()
    @Get('currentUpdate/:id')
    async findUpdate(@Param('id') id: number): Promise<Product> {
        return this.productService.findOneUpdate(Number(id));
    }

    @Public()
    @Post('store')
    async createProduct(@Body() product: Partial<TProduct>) {
        return this.productService.createProduct(product);
    }

    @Public()
    @Post('check-sold-quantity')
    checkSoldQuantity(id: number) {
        return this.productService.checkSoldQuantity(id);
    }

    @Put('update/:id')
    async updateProduct(@Param('id') id: number, @Body() product: TProduct) {
        return this.productService.updateProduct(Number(id), product);
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: number) {
        return this.productService.removeProductTrashed(Number(id));
    }
}
