import { EmailInfo } from "../entity/EmailInfo";
import Item from "../entity/Item";

export class EmailModel {
    /** 邮件列表 */
    emailList(): EmailInfo[] {
        return Object.keys(GState.data.email).map((id) => {
            return GState.data.email[id];
        });
    }

    /** 获取邮件奖励 */
    getEmailReward(id: number): Promise<Item[]> {
        return GApi.email.getEmailReward({ id });
    }

    /** 获取所有邮件奖励 */
    getAllEmailReward(): Promise<Item[]> {
        return GApi.email.getAllEmailReward();
    }

    /** 获取cdkey奖励 */
    getCdKeyReward(key: string): Promise<Item[]> {
        return GApi.cdKey.getCdKeyReward({ key });
    }
    /**有可领取奖励 */
    canObtain(): boolean {
        return this.emailList().some((e) => !e.hasGet);
    }
}
