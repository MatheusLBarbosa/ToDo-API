import { ApiProperty } from "@nestjs/swagger";

export class ValidateResponse {
    @ApiProperty({type: Number, description: 'Código de retorno da validação'})
    ret_code: number;

    @ApiProperty({type: String, description: 'Menssagem de retorno'})
    message: string;
}