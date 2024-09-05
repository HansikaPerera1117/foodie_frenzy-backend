import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductFileAbstractRepository } from './product-file.abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductFileRepository implements ProductFileAbstractRepository {}
