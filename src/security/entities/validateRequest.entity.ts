import { ApiProperty } from "@nestjs/swagger";

export class ValidateRequest {
    @ApiProperty({type: String, description: 'Código do cliente'})
    cod_client: string;

    @ApiProperty({type: Number, description: 'PIN que o cliente recebeu'})
    otp_pin: number;
}