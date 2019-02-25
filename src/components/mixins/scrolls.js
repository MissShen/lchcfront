const common = {
  data(){
    return{
      nodesPosition:[]
    }
  },
  methods:{
    removeClassCurrent(nodeClassName) {
      let jumpNodes = document.getElementsByClassName(nodeClassName);
      for (let i = 0; i < jumpNodes.length; i++) {
        jumpNodes[i].classList.remove('current')
      }
      return jumpNodes
    },
    removeFixed(sideNodeName) {
      let sideNode = document.getElementById(sideNodeName);
      sideNode.classList.remove('side-scroll');
      sideNode.classList.add('side-init');
    },
    addFixed(sideNodeName) {
      let sideNode = document.getElementById(sideNodeName);
      sideNode.classList.remove('side-init');
      sideNode.classList.add('side-scroll');
    },
  }
}

export const windowScroll = {
  mixins:[common],
  methods:{
    changeScrollHeight(pageY, jumpNodeName, currentNodeIndex) {
      window.scrollTo(0, pageY);
      this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');
    },
    getNodesHeight(proInfoDetaiBox, currentShxx) {
      this.nodesPosition = this.nodesPositionInit();
      let vieNode = document.getElementById(proInfoDetaiBox);
      let viewNodeChildeNodes = vieNode.childNodes[0].childNodes;
      console.log(viewNodeChildeNodes)
      viewNodeChildeNodes.forEach(nodeItem => {
        if (nodeItem.nodeName == 'H3') {
          this.nodesPosition.forEach(item => {
            if (nodeItem.className == item.itemAbb) {
              item.nodePosition = nodeItem.offsetTop
            }
          })
        }
      });
      if (currentShxx) {
        let shxx = document.getElementById(currentShxx);
        this.nodesPosition.forEach(item => {
          if ('shxx' == item.itemAbb) {
            item.nodePosition = shxx.offsetTop;
          }
        })
      }
      //去除位置为0的值
      for (let i = 0; i < this.nodesPosition.length; i++) {
        if (!this.nodesPosition[i].nodePosition) {
          this.nodesPosition.splice(i, 1);
          i--;
        }
      }
      console.log('2-----------', this.nodesPosition)
    },
    dialogBoxScroll(scrolltop, jumpNodeName, sideNodeName) {
      let vieNodeScrollTop = scrolltop;
      if (vieNodeScrollTop < this.nodesPosition[0].nodePosition) {
        this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
      }
      this.nodesPosition.forEach((item, index) => {
        if (vieNodeScrollTop > (item.nodePosition - 120)) {
          this.removeClassCurrent(jumpNodeName)[index].classList.add('current');
        }
      });

      if (vieNodeScrollTop < this.nodesPosition[0].nodePosition + 50) {
        this.removeFixed(sideNodeName)
      }
      else {
        this.addFixed(sideNodeName)
      }
    }
  }
};

export const boxScroll = {
  mixins:[common],
  methods:{
    changeScrollHeight(pageY, scrollBoxNodeName, jumpNodeName, currentNodeIndex) {
      let vieNode = document.getElementById(scrollBoxNodeName);
      vieNode.scrollTo(0, pageY);
      this.removeClassCurrent(jumpNodeName)[currentNodeIndex].classList.add('current');
    },
    getNodesHeight(proInfoDetaiBox, currentShxx,currentJgxx) {
      let vieNode = document.getElementById(proInfoDetaiBox);
      let len = vieNode.childNodes[0].childNodes.length;
      let viewNodeChildeNodes;
      if(len > 1){
        viewNodeChildeNodes = vieNode.childNodes[0].childNodes;
      }else{
        if(vieNode.childNodes.length > 0 ){
          viewNodeChildeNodes = vieNode.childNodes;
        }
      }
      viewNodeChildeNodes.forEach(nodeItem => {
        if (nodeItem.nodeName == 'H3') {
          this.nodesPosition.forEach(item => {
            if (nodeItem.className == item.itemAbb) {
              item.nodePosition = nodeItem.offsetTop
            }
          })
        }
      });
      if (currentShxx) {
        let shxx = document.getElementById(currentShxx);
        this.nodesPosition.forEach(item => {
          if ('shxx' == item.itemAbb) {
            item.nodePosition = shxx.offsetTop;
          }
        })
      }
      if(currentJgxx){
          let jgxx = document.getElementById(currentJgxx);
          this.nodesPosition.forEach(item => {
            if ('jgxx' == item.itemAbb) {
              item.nodePosition = jgxx.offsetTop;
            }
          })
      }
      //去除位置为0的值
      for (let i = 0; i < this.nodesPosition.length; i++) {
        if (!this.nodesPosition[i].nodePosition) {
          this.nodesPosition.splice(i, 1);
          i--;
        }
      }
      console.log('2-----------', this.nodesPosition)
    },
    dialogBoxScroll(vieNode, jumpNodeName, sideNodeName) {
      let vieNodeScrollTop = vieNode.scrollTop;
      if (vieNodeScrollTop < this.nodesPosition[0].nodePosition) {
        this.removeClassCurrent(jumpNodeName)[0].classList.add('current');
      }
      this.nodesPosition.forEach((item, index) => {
        if (vieNodeScrollTop > (item.nodePosition - 120)) {
          this.removeClassCurrent(jumpNodeName)[index].classList.add('current');
        }
      });

      if (vieNodeScrollTop < this.nodesPosition[0].nodePosition + 50) {
        this.removeFixed(sideNodeName)
      }
      else {
        this.addFixed(sideNodeName)
      }
    }
  }
}


