import { ApiProperty } from "@nestjs/swagger";

export class OtpRequest {
    @ApiProperty({ type: String, description: 'Código identificador do cliente' })
    cod_client: string;
} 