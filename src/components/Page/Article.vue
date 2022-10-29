<template>
  <teleport to="body">
    <div class="right-fixed" :style="rightFixedStyle">
      <div
        class="favor"
        style="font-size: 32px; text-align: center"
        @click="clickFavor"
      >
        <CustomIcon
          type="icon-dianzan2"
          :style="article.rightFixedData.favor ? 'color: red;' : ''"
        />
        <p style="font-size: 16px; padding: 0 5px">
          {{ article.rightFixedData.favorTotal }}
        </p>
      </div>
      <div
        class="collect"
        style="font-size: 33px; margin-top: 15px; text-align: center"
        @click="clickCollect"
      >
        <CustomIcon
          :type="
            article.rightFixedData.collect ? 'icon-shoucang1' : 'icon-shoucang'
          "
        />
      </div>
    </div>
  </teleport>
  <div class="error" v-if="error">
    <CustomIcon type="icon-chucuo" style="font-size: 80px" />
    <p>出错啦1</p>
  </div>
  <div class="article" ref="article-wrap" v-else>
    <h1 style="margin-bottom: 6px">{{ article.title }}</h1>
    <p style="font-size: 12px; margin-bottom: 15px" class="article-info">
      <span>
        <CustomIcon type="icon-date"></CustomIcon>
        {{ article.timestamp }}
      </span>
      <span @click="jumpFilterArticles({ type: article.type })">
        <CustomIcon type="icon-diantileimu"></CustomIcon>
        {{ article.type }}
      </span>
      <span>
        <CustomIcon type="icon-24gl-tags4"></CustomIcon>
        <span
          v-for="item in article.tags"
          class="tag"
          :key="item"
          @click="jumpFilterArticles({ tags: [item] })"
        >
          {{ item }}
        </span>
      </span>
    </p>
    <p
      v-if="article.lastModify !== article.timestamp"
      style="text-align: center; margin: 18px 0; color: #919191"
    >
      最后于 {{ article.lastModify }} 被编辑
    </p>
    <div v-html="article.content" class="w-e-text"></div>
  </div>
  <div id="comment">
    <div class="comment-title">
      <CustomIcon type="icon-pinglun" />
      评论区
    </div>
    <div class="input-area">
      <textarea placeholder="我来说两句……" ref="commentContent"></textarea>
      <button class="primary" @click="submitComment('')">提交</button>
    </div>
    <div id="comment-wrap">
      <div
        class="comment-item"
        v-for="(item, commentIndex) in article.comment"
        :key="item.id"
      >
        <div class="user-data">
          <div class="avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="cz-nickname">
            {{ item.nickname }}
          </div>
        </div>
        <div class="comment-content">
          <CustomIcon
            type="icon-maohao"
            style="font-size: 23px; margin-right: 5px"
          />
          {{ item.content }}
          <div
            class="reply-wrap"
            v-if="item.children && Object.keys(item.children).length > 0"
          >
            <div
              class="reply-item"
              v-for="reply in item.children"
              :key="reply.id"
            >
              <span style="font-weight: bold">{{ reply.nickname }}：</span>
              {{ reply.content }}
              <span style="padding: 0 8px; color: #999">{{
                reply.timestamp
              }}</span>
              <span
                v-if="$store.state.userData.uid === reply.uid"
                class="reply-del"
                @click="deleteComment(reply.id, item.id)"
              >
                删除</span
              >
            </div>
          </div>
        </div>
        <div class="interaction">
          <div style="display: flex">
            <div class="comment-time" style="color: #999">
              {{ item.timestamp }}
            </div>
            <div class="operation">
              <div
                v-if="$store.state.userData.uid === item.uid"
                class="operation-item"
                @click="deleteComment(item.id)"
              >
                删除
              </div>
              <div
                class="operation-item"
                @click="showReplyAnswer(commentIndex, false)"
              >
                回复
              </div>
            </div>
          </div>
        </div>
        <div class="comment-answer-input-wrap" v-if="item.showAnswer">
          <textarea
            ref="replyContent"
            :placeholder="'回复' + item.nickname + ',最多200个字'"
            maxlength="200"
          ></textarea>
          <button class="primary" @click="submitReply(item.id)">回复</button>
          <button @click="cancleAnswer">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/a11y-dark.css";
import highlight from "highlight.js";

export default {
  props: ["id"],
  data() {
    return {
      article: {
        rightFixedData: {
          favor: false,
          favorTotal: 0,
          collect: false,
        },
      },
      error: false,
      lastOpenAnswer: "",
      rightFixedStyle: "",
    };
  },
  methods: {
    jumpFilterArticles(json) {
      this.$router.push({ name: "arts", query: { f: JSON.stringify(json) } });
    },
    showReplyAnswer(arg1) {
      this.cancleAnswer();
      this.article.comment[arg1].showAnswer = true;
      this.lastOpenAnswer = arg1;
    },
    cancleAnswer() {
      //将上次点击“回复”展示的textarea对应的控制变量设置为false，
      if (this.lastOpenAnswer) {
        this.article.comment[this.lastOpenAnswer].showAnswer = false;
      }
      this.lastOpenAnswer = "";
    },
    deleteComment(id, parentId) {
      this.$axios
        .get(
          this.HTTP_Config.protocol +
            this.HTTP_Config.domain +
            "/api/art/delComment.action?id=" +
            id
        )
        .then((res) => {
          if (res.data.success) {
            if (parentId) {
              delete this.article.comment[parentId].children[id];
            } else {
              delete this.article.comment[id];
            }
          }
        });
    },
    comment(data, to) {
      if (this.$store.state.userData.success) {
        this.$axios
          .post(
            this.HTTP_Config.protocol +
              this.HTTP_Config.domain +
              "/api/art/comment.action",
            "data=" + JSON.stringify(data)
          )
          .then((res) => {
            if (res.data.success) {
              if (to) {
                //回复
                this.article.comment[to].children[res.data.data.id] =
                  res.data.data;
                this.cancleAnswer();
              } else {
                //评论
                this.article.comment[res.data.data.id] = res.data.data;
              }
            } else {
              alert(res.data.msg);
            }
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    submitComment(to) {
      this.comment({
        aid: this.article.id,
        content: this.$refs.commentContent.value,
        to,
      });
    },
    submitReply(to) {
      this.comment(
        {
          aid: this.article.id,
          content: this.$refs.replyContent.value,
          to,
        },
        to
      );
    },
    windowResize() {
      if (window.innerWidth > 1020) {
        this.rightFixedStyle = `left: ${
          this.$refs["article-wrap"].parentNode.offsetLeft +
          this.$refs["article-wrap"].parentNode.offsetWidth +
          10
        }px;`;
      }
    },
    clickFavor() {
      if (this.$store.state.userData.success) {
        this.$axios
          .get(
            this.HTTP_Config.protocol +
              this.HTTP_Config.domain +
              "/api/favorArticle.action?aid=" +
              this.article.id
          )
          .then((res) => {
            if (res.data.success) {
              if (this.article.rightFixedData.favor) {
                this.article.rightFixedData.favorTotal--;
              } else {
                this.article.rightFixedData.favorTotal++;
              }
              this.article.rightFixedData.favor =
                !this.article.rightFixedData.favor;
            }
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    clickCollect() {
      if (this.$store.state.userData.success) {
        this.$axios
          .get(
            this.HTTP_Config.protocol +
              this.HTTP_Config.domain +
              "/api/collectArticle.action?aid=" +
              this.article.id
          )
          .then((res) => {
            if (res.data.success) {
              this.article.rightFixedData.collect =
                !this.article.rightFixedData.collect;
            }
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
  mounted() {
    this.$axios
      .get(
        this.HTTP_Config.protocol +
          this.HTTP_Config.domain +
          "/api/art/get.action?id=" +
          this.id
      )
      .then((res) => {
        if (res.data.success) {
          this.article = res.data.data;
          this.article.content = unescape(this.article.content);
          setTimeout(() => {
            document.querySelectorAll("pre code").forEach((item) => {
              highlight.highlightElement(item);
            });
          }, 10);
        } else {
          this.error = true;
        }
      });
    this.windowResize();
    window.addEventListener("resize", this.windowResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.windowResize);
  },
};
</script>

<style>
@media screen and (max-width: 1020px) {
  .right-fixed {
    display: none;
  }
}

p {
  margin: 14px 0;
}
button {
  outline: none;
  border: 1px solid #d5d5d5;
  padding: 6px 13px;
  border-radius: 4px;
}
button.primary {
  background-color: rgb(123, 123, 199);
  color: white;
}

.comment-answer-input-wrap textarea {
  width: 100%;
  height: 60px;
  padding: 7px;
  box-sizing: border-box;
}

.operation {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}
.interaction {
  position: relative;
}
.operation-item {
  font-weight: bold;
  color: rgb(59, 59, 224);
  cursor: pointer;
  user-select: none;
  line-height: 16px;
  margin: 0 3px;
}
.reply-del {
  display: none;
  font-weight: bold;
  color: rgb(59, 59, 224);
  cursor: pointer;
  user-select: none;
}
.reply-item:hover .reply-del {
  display: inline;
}

.reply-wrap {
  margin: 10px 0;
  padding: 10px 18px;
  background-color: #f5f5f5;
}
.reply-item {
  margin: 5px 0;
}

#comment-wrap {
  border-top: 1px solid #d5d5d5;
  margin-top: 15px;
}
.comment-item {
  width: calc(100% - 30px);
  margin: 0 auto;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 15px;
}
.user-data {
  display: flex;
  user-select: none;
}
.user-data img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgb(197, 197, 105);
  vertical-align: middle;
}
.cz-nickname {
  line-height: 30px;
  margin: 0 5px;
}
.comment-content {
  width: calc(100% - 30px);
  margin: 0 auto;
  padding: 15px 0;
  min-height: 50px;
}
.interaction::after {
  content: "";
  display: block;
  clear: both;
}

.comment-title {
  width: calc(100% - 30px);
  margin: 0 auto;
  font-size: 21px;
}
#comment {
  margin-top: 20px;
  background-color: white;
  padding: 10px 0;
  border-radius: 5px;
}
textarea {
  outline: none;
  resize: none;
  border: 1px solid #c5c5c5;
}
textarea:focus {
  border: 1px solid rgb(95, 95, 202);
}
.input-area {
  width: calc(100% - 30px);
  margin: 8px auto 0;
}
.input-area textarea {
  width: calc(100% - 6px);
  height: 120px;
}

.w-e-text img {
  max-width: 100%;
}
.w-e-text pre code {
  background-color: rgb(40, 44, 52);
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-weight: bold;
  overflow-x: auto;
  padding: 20px 5px;
  font-family: "Fira Code", serif;
}
.error {
  text-align: center;
  font-size: 30px;
}
.article {
  position: relative;
  padding: 20px 0;
  font-size: 16px !important;
}
.right-fixed {
  position: fixed;
  top: 50%;
}
.article code {
  font-weight: bold;
}
.article-info > span {
  padding-right: 10px;
}
.tag {
  display: inline-block;
  background-color: #ddd;
  padding: 0 4px;
  line-height: 19px;
  border-radius: 3px;
  margin-left: 3px;
  color: #444;
  cursor: pointer;
}
</style>
