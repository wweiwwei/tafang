import WebSocket from 'ws';

export class Room {
    seed: number
    constructor(public key: number) {
        this.seed = Date.now() % 1000000
    }

    wsockets: WebSocket[] = [];


    addPlayer(ws: WebSocket): number {
        this.wsockets.push(ws);
        return this.wsockets.length - 1;
    }

    private teams: {
        index: number;
        info: string;
    }[] = []
    infoReady = 0;
    addBattleTeam(index: number, info: string) {
        this.infoReady++;
        this.teams[index] = { index, info };
        if (this.infoReady >= 2) {
            this.matchReady();
            this.begin();
        }
    }

    matchReady() {
        console.log("matchReady")
        this.wsockets.forEach((ws, index) => {
            const data = {
                yourTeam: {
                    index,
                    info: this.teams[index].info
                },
                otherTeam: {
                    index: index === 1 ? 0 : 1,
                    info: this.teams[index === 1 ? 0 : 1].info
                },
                seed: this.seed
            }
            ws.send(JSON.stringify({
                kind: "match",
                data
            }));
        })
    }

    intervalId: number = 0;

    begin() {
        setInterval(() => {
            this.tick();
        }, 1000 / 60);
    }
    addCommand(index: number, c: string) {
        this.commandCache[index].push(c);
    }
    private commandCache: string[][] = [[], []]
    commandList: {
        frame: number;
        command: string[];
    }[] = [];
    frame = 0;
    tick() {
        const command0 = this.commandCache[0].length > 0 ? this.commandCache[0].shift() : "[]";
        const command1 = this.commandCache[1].length > 0 ? this.commandCache[1].shift() : "[]";
        const data = {
            frame: this.frame,
            command: [command0, command1]
        }
        this.commandList.push(data)
        this.wsockets.forEach(ws => {
            ws.send(JSON.stringify({
                kind: "command",
                data
            }))
        })
        this.frame++;
    }

    end() {
        clearInterval(this.intervalId);
    }

}