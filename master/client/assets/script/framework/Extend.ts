/**扩展 spine 的 update 方法 达到在编辑模式下 自动播放动画的目的 */
if (CC_EDITOR) {
    sp.Skeleton.prototype["update"] = function (dt) {
        //if (CC_EDITOR) return;
        if (CC_EDITOR) {
            cc["engine"]._animatingInEditMode = 1;
            cc["engine"].animatingInEditMode = 1;
        }
        if (this.paused) return;

        dt *= this.timeScale * sp["timeScale"];

        if (this.isAnimationCached()) {
            // Cache mode and has animation queue.
            if (this._isAniComplete) {
                if (this._animationQueue.length === 0 && !this._headAniInfo) {
                    let frameCache = this._frameCache;
                    if (frameCache && frameCache.isInvalid()) {
                        frameCache.updateToFrame();
                        let frames = frameCache.frames;
                        this._curFrame = frames[frames.length - 1];
                    }
                    return;
                }
                if (!this._headAniInfo) {
                    this._headAniInfo = this._animationQueue.shift();
                }
                this._accTime += dt;
                if (this._accTime > this._headAniInfo.delay) {
                    let aniInfo = this._headAniInfo;
                    this._headAniInfo = null;
                    this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
                }
                return;
            }

            this._updateCache(dt);
        } else {
            this._updateRealtime(dt);
        }
    };
}

// cc.Label.prototype.showDebug(true)
// cc.Label.prototype.showDebug(false)
// 展示缓存图集
(() => {
    //@ts-ignore
    cc.Label.prototype.showDebug = function (show) {
        if (show) {
            if (!this._debugNode || !this._debugNode.isValid) {
                let width = cc.visibleRect.width;
                let height = cc.visibleRect.height;

                this._debugNode = new cc.Node("SHAREATLAS_DEBUG_NODE");
                this._debugNode.width = width;
                this._debugNode.height = height;
                this._debugNode.x = width / 2;
                this._debugNode.y = height / 2;
                this._debugNode.zIndex = cc.macro.MAX_ZINDEX;
                this._debugNode.parent = cc.director.getScene();

                //@ts-ignore
                this._debugNode.groupIndex = cc.Node.BuiltinGroupIndex.DEBUG;
                //@ts-ignore
                cc.Camera._setupDebugCamera();

                let scroll = this._debugNode.addComponent(cc.ScrollView);

                let content = new cc.Node("CONTENT");
                let layout = content.addComponent(cc.Layout);
                layout.type = cc.Layout.Type.VERTICAL;
                layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
                content.parent = this._debugNode;
                content.width = 2048;
                content.anchorY = 1;
                content.x = 2048;

                scroll.content = content;

                let node = new cc.Node("ATLAS");
                //@ts-ignore
                let texture = cc.Label._shareAtlas.getTexture();
                let spriteFrame = new cc.SpriteFrame();
                spriteFrame.setTexture(texture);

                let sprite = node.addComponent(cc.Sprite);
                sprite.spriteFrame = spriteFrame;

                node.parent = content;
            }
            return this._debugNode;
        } else {
            if (this._debugNode) {
                this._debugNode.parent = null;
                this._debugNode = null;
            }
        }
    };
})();
