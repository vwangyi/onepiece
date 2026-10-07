## 拦截器 和 rxjs 
- `nest g itc timeout`: `给timeout这个模块加拦截器` 
```ts
@UseInterceptors(TimeoutInterceptor);
export class xxx {
    @Get()
    @UseInterceptors(TimeoutInterceptor);
    findAll() {}
}
```
```ts
// app.moudle.ts
import { APP_GUARD } from '@nestjs/core'
import { PersonGuard } from './xxx'
@Module({
    imports:[],
    controllers:[],
    provides: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: PersonGuard, // 把类给IOC容器管理  （全局使用）
        }, 
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeIntercepor, // 把类给IOC容器管理 （全局使用）
        }
    ]
})
```