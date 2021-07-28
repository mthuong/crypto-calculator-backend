import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PriceSchedulerService } from '@modules/price-scheduler/price-scheduler.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService, private readonly priceSchedulerService: PriceSchedulerService) {}

  @Post()
  async create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }

  @Get()
  findAll() {
    // return this.priceService.findAll();
    return 'Error';
  }

  @Get('/sync')
  async sync() {
    if (process.env.NODE_ENV == 'development') {
      return this.priceSchedulerService.getNewPrice();
    }

    return { message: 'go away please' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }
}
