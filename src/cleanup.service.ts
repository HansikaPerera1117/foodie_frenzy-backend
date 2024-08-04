import { Injectable } from "@nestjs/common";

@Injectable()
export class CleanupService {
  destroy(): void {
    // Your cleanup logic here
    console.log('Cleanup logic executed');
  }
}
