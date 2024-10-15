import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Public } from '../auth/constants';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }
  @Public()
  @Get()
  find() {
    return this.roleService.find();
  }
}
