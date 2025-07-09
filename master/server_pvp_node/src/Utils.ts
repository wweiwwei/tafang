export class Utils {
    private static uid: number = 1;

    static uuid() {
        return this.uid++;
    }

}