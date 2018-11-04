# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Chatspace #

## members-Table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groups-tabel
|Culmn|Type|Option|
|-----|----|------|
|group_name|strings|null: false, foreign_key: true|


### Association
- has_many :users though::members
- has_many :posts


## user-tabel
|Culmn|Type|Option|
|-----|----|------|
|name|strings|null: false, foreign_key: true|
|e_mail|strings|null: false, foreign_key: true, unique:true|

### Association
- has_many :groups
- has_many :posts

## posts-tabel
|Culmn|Type|Option|
|-----|----|------|
|user_id|integer|null: false, foreign_key: true|
|text|strings||
|image|strings||

### Association
- belongs_to :group
- belongs_to :user
