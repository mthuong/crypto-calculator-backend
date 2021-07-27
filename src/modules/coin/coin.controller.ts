import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@ApiTags('coin')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  // @Post()
  // create(@Body() createCoinDto: CreateCoinDto) {
  //   return this.coinService.create(createCoinDto);
  // }

  @Get()
  async findAll() {
    return this.coinService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coinService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
  //   return this.coinService.update(+id, updateCoinDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coinService.remove(+id);
  // }
}
