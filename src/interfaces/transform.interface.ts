import { BaseEntity } from '../common/base.entity';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { PageDto } from '../common/dto/page.dto';
import { Resource } from '../common/resource';

export interface TransformResponse {
  statusCode: number;
  data: Resource | Resource[] | BaseEntity | BaseEntity[] | PageDto<Resource>;
  count?: number;
  meta?: PageMetaDto;
}

export interface TransformApiResource {
  id: string;
  type: string;
  attributes: Resource;
}
