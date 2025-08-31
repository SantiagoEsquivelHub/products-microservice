import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger("ProductService");

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Database connected")
  }
  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: { available: true }
      }),
      meta: {
        page: page,
        total: totalPages,
        lastPage: lastPage
      }
    }

  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    })

    if (!product) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Product with id #${id} not found`
      });
    }

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const {id:__, ...data} = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data
    })
  }

  async remove(id: number) {

    await this.findOne(id);

    // Fisic deleting
    // return this.product.delete({
    //   where: { id },
    // })

    return this.product.update({
      where: { id },
      data: {
        available: false
      }
    })
  }
}
