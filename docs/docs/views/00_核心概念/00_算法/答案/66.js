/**
 * 用策略模式重构下面代码 消除if else 
 */
const player = {
    state: 'stopped', // stopped | playing | paused
}
// 播放
function play() {
    if (player.state === 'stopped') {
        player.state = 'playing'  
        console.log('开始播放')
    } else if (player.state === 'playing') {
        console.log('已经是播放了')
    } else if (player.state === 'paused') {
        player.state = 'playing'  
        console.log('继续播放')
    }
}
// 暂停
function pause() {
    if (player.state === 'stopped') {
        console.log('没有播放 不能暂停')
    } else if (player.state === 'playing') {
        player.state = 'paused'  
        console.log('暂停')
    } else if (player.state === 'paused') {
        console.log('已经是暂停了')
    }
} 

play();  // 开始播放
play();  // 已经在播放了
pause(); // 暂停
play();  // 继续播放
 


// ----------------------------------------------------------------------

/* 
答案 

// 停止状态对象
const stopped = {
    play() {
        console.log('开始播放');
        player.state = playing;
    },
    pause() {
        console.log('还没播放，不能暂停');
    }
};

// 播放状态对象
const playing = {
    play() {
        console.log('已经在播放了');
    },
    pause() {
        console.log('暂停');
        player.state = paused;
    }
};

// 暂停状态对象
const paused = {
    play() {
        console.log('继续播放');
        player.state = playing;
    },
    pause() {
        console.log('已经是暂停状态');
    }
};

// 播放器
const player = {
    state: stopped,
    play() {
        this.state.play();
    },
    pause() {
        this.state.pause();
    }
};

// 用起来
player.play();  // 开始播放   → state 变成 playing
player.play();  // 已经在播放了
player.pause(); // 暂停       → state 变成 paused
player.play();  // 继续播放   → state 变成 playing

*/ 