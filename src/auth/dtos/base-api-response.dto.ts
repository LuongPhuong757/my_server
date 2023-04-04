import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class BaseApiErrorObject {
    @ApiProperty({ type: Number })
    public statusCode: number
  
    @ApiProperty({ type: String })
    public message: string
  
    @ApiPropertyOptional({ type: String })
    public localizedMessage: string
  
    @ApiProperty({ type: String })
    public errorName: string
  
    @ApiProperty({ type: Object })
    public details: unknown
  
    @ApiProperty({ type: String })
    public path: string
  
    @ApiProperty({ type: String })
    public requestId: string
  
    @ApiProperty({ type: String })
    public timestamp: string
  }
  
  export class BaseApiErrorResponse {
    @ApiProperty({ type: BaseApiErrorObject })
    public error: BaseApiErrorObject
  }