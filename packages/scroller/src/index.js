class Scroller {
    // 初始化实例
    init(el, binding) {
        this.el = el;
        this.binding = binding;
        this.distance = Number(el.getAttribute("scroll-distance")) || 1;
        this.scrollElement = this.getScrollEventTarget(this.el);
        this.scrollListener();
        this.scrollElement.addEventListener('scroll', this.scrollListener.bind(this));
    }
    // 滚动事件
    scrollListener() {
        if( !(this.el.getAttribute("scroll-disabled")==='false') ){
            var scrollTop =  this.scrollElement === window ? (document.documentElement.scrollTop || document.body.scrollTop) : this.scrollElement.scrollTop,
            clientHeight = this.scrollElement === window ? (document.documentElement.clientHeight || document.body.clientHeight) : this.scrollElement.clientHeight;
            // 如果滚动的是他本身
            if(this.el == this.scrollElement) {
                // 盒子高度
                if(this.scrollElement.scrollHeight - (scrollTop + clientHeight) <= this.distance){
                    this.binding.value()
                }
            } else {
                if((this.el.offsetHeight+this.el.offsetTop) - (scrollTop + clientHeight) <= this.distance){
                    this.binding.value()
                }
            }
        }
    }
    getScrollEventTarget(element) {
        var currentNode = element;
        while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
            var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode;
            }
            currentNode = currentNode.parentNode;
        }
        return window;
    }
}
let scroller = new Scroller();
export default {
    bind: function(el, binding, vnode){
        const vm = vnode.context;
        vm.$nextTick( ()=> {
            scroller.init(el, binding)
        })
    },
    unbind: function(){
        scroller.scrollElement.removeEventListener('scroll', scroller.scrollListener);
    }
}