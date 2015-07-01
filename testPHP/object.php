<?php
	class ShopProduct{
		public $title="default product";
		public $productMainName="main name";
		public $productFirstName="first name";
		public $price=0;

		function __construct($title="default product",$productMainName="main name",$productFirstName="first name",$price=0){
			$this->title=$title;
			$this->productMainName=$productMainName;
			$this->productFirstName=$productFirstName;
			$this->price=$price;
		}
	}
	$product1=new ShopProduct("title1","ddv","d","$110");
	var_dump($product1);
	$product2=new ShopProduct();
	var_dump($product2);
?>