import { ApiProperty } from "@nestjs/swagger"

export class BaseApiResponse<T> {
    public data: T // Swagger Decorator is added in the extended class below, since that will override this one.
  
    @ApiProperty({ type: Object })
    public meta: any
  }

export function SwaggerBaseApiResponse<T>(type: T): typeof BaseApiResponse {
    class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
      @ApiProperty({ type })
      public data: T
    }
    // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
    // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
    const isAnArray = Array.isArray(type) ? ' [ ] ' : ''
    Object.defineProperty(ExtendedBaseApiResponse, 'name', {
      value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`
    })
  
    return ExtendedBaseApiResponse
  }