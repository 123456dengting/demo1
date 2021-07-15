#### 简要描述：

- 商品查询通用类目树接口123456

#### 请求URL:

- /v1/open/goods/category/commonTree

#### 请求方式：

- POST

#### 请求头：

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|Content-Type |是  |string |请求类型： application/json   |
|app-id |是  |integer |应用id   |
|access-token |是  |string |请求token   |
|sign |是  |string |请求签名   |  
|timestamp |是  |long |请求时间戳   |

#### 请求参数:

|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|shopId |是  |long |店铺id   |  

#### 请求示例:

```
{
    "shopId": "2500826813492626438"
}
```

#### 返回示例:

**正确时返回:**

```
{
	"success": true,
	"errMsg": null,
	"errCode": null,
	"data": [
		{
			"id": 70072,
			"name": "test_liulu",
			"children": [
				{
					"id": 70075,
					"name": "test_liulu_2",
					"children": null,
					"leaf": 1,
					"level": 2,
					"salePropCustomized": 1,
					"status": 1,
					"nameEn": "test_liulu_2",
					"nameZh": "test_liulu_2",
					"imageUrl": "https://dev-bimg.akulaku.net/goods/other/3b617d84645c4d6db3de2209bb8b07983157.png",
					"pid": 70072
				}
			],
			"leaf": 0,
			"level": 1,
			"salePropCustomized": 1,
			"status": 0,
			"nameEn": "test_liulu",
			"nameZh": "test_liulu",
			"imageUrl": "https://dev-bimg.akulaku.net/goods/other/15e6bf176af64eda8e20d6e64a8ff79c5137.png",
			"pid": 0
		},
		{
			"id": 20125,
			"name": "Hobi",
			"children": [
				{
					"id": 20126,
					"name": "Buku & Alat Tulis",
					"children": [
						{
							"id": 30658,
							"name": "Buku",
							"children": null,
							"leaf": 1,
							"level": 3,
							"salePropCustomized": 1,
							"status": 1,
							"nameEn": "Book",
							"nameZh": "图书",
							"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
							"pid": 20126
						},
						{
							"id": 30659,
							"name": "Alat Tulis",
							"children": null,
							"leaf": 1,
							"level": 3,
							"salePropCustomized": 1,
							"status": 1,
							"nameEn": "Stationery",
							"nameZh": "文具",
							"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
							"pid": 20126
						}
					],
					"leaf": 0,
					"level": 2,
					"salePropCustomized": 1,
					"status": 0,
					"nameEn": "Books & stationery",
					"nameZh": "图书和文具",
					"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
					"pid": 20125
				},
				{
					"id": 20127,
					"name": "Perawatan Hewan",
					"children": [
						{
							"id": 30660,
							"name": "Makanan Hewan",
							"children": null,
							"leaf": 1,
							"level": 3,
							"salePropCustomized": 1,
							"status": 1,
							"nameEn": "Pet food",
							"nameZh": "宠物食品",
							"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
							"pid": 20127
						},
						{
							"id": 30661,
							"name": "Peralatan Hewan",
							"children": null,
							"leaf": 1,
							"level": 3,
							"salePropCustomized": 1,
							"status": 1,
							"nameEn": "Pet care tools",
							"nameZh": "宠物护理工具",
							"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
							"pid": 20127
						},
						{
							"id": 30662,
							"name": "Aksesoris Hewan",
							"children": null,
							"leaf": 1,
							"level": 3,
							"salePropCustomized": 1,
							"status": 1,
							"nameEn": "Toy for pet",
							"nameZh": "宠物玩具",
							"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
							"pid": 20127
						}
					],
					"leaf": 0,
					"level": 2,
					"salePropCustomized": 1,
					"status": 0,
					"nameEn": "Pet care",
					"nameZh": "宠物护理",
					"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
					"pid": 20125
				},
				{
					"id": 30656,
					"name": "Alat Musik",
					"children": null,
					"leaf": 1,
					"level": 2,
					"salePropCustomized": 1,
					"status": 1,
					"nameEn": "Musical instrument",
					"nameZh": "乐器",
					"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
					"pid": 20125
				},
				{
					"id": 30657,
					"name": "Aksesoris Musik",
					"children": null,
					"leaf": 1,
					"level": 2,
					"salePropCustomized": 1,
					"status": 1,
					"nameEn": "Musical instrument accessories",
					"nameZh": "乐器配件",
					"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
					"pid": 20125
				}
			],
			"leaf": 0,
			"level": 1,
			"salePropCustomized": 1,
			"status": 0,
			"nameEn": "Hobby",
			"nameZh": "爱好",
			"imageUrl": "https://bimg.akulaku.net/goods/category/img_pld.png",
			"pid": 0
		}
	]
}

```
#### 出参说明
|参数名|是否必须|类型|说明|
|:----    |:---|:----- |-----   |
|sellMode |是  |integer | 1-自营(采销)；2-POP(寄售)；3-API_JD商品(代售)；4-API_BL商品(代售)	    |
|leaf |是  |integer |是否叶子节点 1：是0：否	    |
|level |是  |integer | 层级	    |
|salePropCustomized |是  |integer |是否支持销售属性自定义 0-否； 1-是	    |
|status |是  |integer | 节点状态，0：未启用，1:已启用	    |
|nameEn |是  |integer | 英文名称	    |
|nameZh |是  |integer | 中文名称	    |
|imageUrl |是  |integer | 图片地址	    |
|pid |是  |long | 父级类目ID	    |
|children |是  |list | 子类目集合（数据结构同自身）	    |  
|name |是  |string | 类目名称	    |
|id |是  |long | 类目ID	    |  

**错误时返回:**


```
{
    "errcode": 500,
    "errmsg": "invalid appid"
}
```


#### 备注: