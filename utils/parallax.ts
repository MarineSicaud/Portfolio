// Get offset top to the element or his parent
function getOffsetTop(element: HTMLElement, acc = 0): number {
    if ( element.offsetParent ){
        return getOffsetTop(element.offsetParent as HTMLElement, acc + element.offsetTop);
    }

    return acc + element.offsetTop;
}

export class Parallax {
    public element: HTMLElement;
    public ratio: number;
    public offset: number;

    constructor(element: HTMLElement){
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax!);
        this.offset = parseFloat(element.dataset.offset!) || 0;
        this.onScroll = this.onScroll.bind(this);

        document.addEventListener("scroll", this.onScroll);
        this.onScroll();
    }

    onScroll(){
        if ( !window ) return

            let screenY = window.scrollY + window.innerHeight;
        let offsetTop = getOffsetTop(this.element) + this.element.offsetHeight / 2
            let diffY = offsetTop - screenY - this.offset;

        let maxDist = window.innerHeight;
        let t = Math.max(-1, Math.min(1, diffY / maxDist));
        let lerped = 50 + t * this.ratio;
        let clamped = Math.max(50 - this.ratio, Math.min(50 + this.ratio, lerped));

        this.element.style.setProperty("transform", `translate(-50%, ${clamped * -1}%)`);
    }

    static bind(){
        return Array.from(document.querySelectorAll("[data-parallax]")).map(
                (element: Element) => 
                {
                return new Parallax(element as HTMLElement);
                }
        );
    }
}
