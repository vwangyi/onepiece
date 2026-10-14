
## 路由守卫 guard
- 路由守卫和中间件是类似的  在调用controller之前 返回true false 来判断是否放行 有全局守卫和局部守卫
 
- `nest g gu 模块名`: `给这个模块加局部路由守卫`

## 局部路由守卫
> 作用于整个controller
```ts
// 在某个contooler的类 使用 @UseGuard(PersonGuard)
import { PersonGuard } from './person.guard';
@Controller()
@UseGuard(PersonGuard) // 作用于整个controller
export class PersonCtroller() {}
```
> 作用于controller的某个路由某个方法上
```ts 
import { PersonGuard } from './person.guard';
@Controller()
export class PersonCtroller() {

    @Get()
    @UseGuard(PersonGuard) // 作用于某个路由
    findAll() {

    }
}
```

- 应用场景 权限 角色 


## 全局路由守卫
> 方式1 
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
            useClass: PersonGuard,
        }
    ]
})
```

> 方式2 不建议用
```ts
// main.ts
import {PersonGuard } from './person/person.guard'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new PersonGuard()) // 全局路由守卫
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```



