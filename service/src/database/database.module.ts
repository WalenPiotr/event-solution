import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

function DatabaseWithConfigModule(): DynamicModule {
  const connectionString = `mongodb://localhost:27017/dbname`;
  return MongooseModule.forRoot(connectionString, {
    useNewUrlParser: true,
  });
}

@Global()
@Module({
  imports: [ConfigModule, DatabaseWithConfigModule()],
})
export class DatabaseModule {}
