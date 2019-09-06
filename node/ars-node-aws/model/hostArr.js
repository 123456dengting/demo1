/**
 * State
 * 
  0 : pending
  16 : running
  32 : shutting-down
  48 : terminated
  64 : stopping
  80 : stopped

 */

 
function reStart(time, awsEc2){
  setTimeout(() => {
    let params = [
      { 
        index: this.index,
        InstanceId: this.InstanceId,
        region: this.region,
      }
    ]
    this.isReStart = true;
    this.used = 0;
    this.reStartNum++;
    awsEc2.restartHost(params)
  }, time)
}

const　initKey = {
  State: { Code: '', Name: '' },
  PrivateIpAddress: '',
  PublicIpAddress: '',
  PublicDnsName: '',
  region: 'us-east-1',
  reStart: reStart,
  used: 0,
  reStartNum: 0,
  isReStart: false,
}

module.exports = [
  {
    index: 0,
    InstanceId: 'i-0230b9c270fc4de2e',
    // InstanceId: 'i-0a5147163a55c868d',
    ...initKey
  },
  {
    index: 1,
    InstanceId: 'i-0495a277deb9c5ada',
    ...initKey
  },
  {
    index: 2,
    InstanceId: 'i-071741cf9f25a2b1d',
    ...initKey
  },
  {
    index: 3,
    InstanceId: 'i-08907579d2c6aabc0',
    ...initKey
  },
  {
    index: 4,
    InstanceId: 'i-08cd9f2d0087f0e2c',
    ...initKey
  },
  {
    index: 5,
    InstanceId: 'i-0b67c76bdcd78aeff',
    ...initKey
  },
  {
    index: 6,
    InstanceId: 'i-0bbc30deedc5bc5c7',
    ...initKey
  },
  {
    index: 7,
    InstanceId: 'i-0c67312c7970a8412',
    ...initKey
  },
  {
    index: 8,
    InstanceId: 'i-0d78edfd3a1b0ad38',
    ...initKey
  },
  {
    index: 9,
    InstanceId: 'i-0ea201e8b265f5b3b',
    ...initKey
  }
]