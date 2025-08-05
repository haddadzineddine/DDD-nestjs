export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),

    database: {
        type: 'sqlite',
        name: 'db.sqlite',
        entities: [__dirname + '/../**/*.schema{.ts,.js}'],
        synchronize: true,
    },
});