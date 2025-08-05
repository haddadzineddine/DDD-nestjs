import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const swagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Matchers TT API')
        .setDescription('API documentation for the Matchers TT application. This API provides endpoints for user management and other features.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}