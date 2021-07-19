<template>
  <q-page style="height: calc(-70px + 100vh); overflow: hidden;">
    <div class="row" style="height: 100%; overflow: hidden;">
      <!-- Leftside -->
      <div class="col-auto column msg-left-cont" style="height: 100%; overflow: auto">
        <div class="col-auto column">
          <div class="col-auto row" style="height: 45px;">
            <div class="col text-center bg-primary text-white cursor-pointer" style="padding-top: 10px;"
            @click="newMessage">
              <q-icon name="add" size="25px" />
              New
            </div>
            <div class="col text-center msg-box bg-secondary text-white msg-box cursor-pointer" style="padding-top: 10px;"
            @click="viewInbox" >
              <q-icon name="inbox" size="23px" />
              Inbox
            </div>
            <div class="col text-center msg-box text-secondary cursor-pointer" style="padding-top: 10px;"
             @click="viewSent">
              <q-icon name="send" size="23px" />
              Sent
            </div>
          </div>
          <div class="col-auto">
            searchfield
          </div>
          <div class="col-auto row">
            <div class="col">
              Filter
            </div>
          </div>
        </div>
        <div class="col column align-stretch">
          <!-- TODO: add today's separator from others -->
          <!-- message -->
          <div class="col-auto cursor-pointer" v-for="(msg, key) in viewList" :key="msg.id" @click="openMsg(msg)">
            <q-list highlight inset-separator>
              <q-item multiline>
                <q-item-side>
                  <q-item-tile avatar>
                    <img v-if="msg.from" v-bind:src="msg.from.img">
                    <img v-if="msg.to" v-bind:src="msg.to.img">
                  </q-item-tile>
                </q-item-side>
                <q-item-main>
                  <q-item-tile label v-if="msg.from">{{ msg.from.name }}</q-item-tile>
                  <q-item-tile label v-if="msg.to">{{ msg.to.name }}</q-item-tile>
                  <q-item-tile sublabel lines="2">
                   {{ key }}  {{ msg.title }}
                  </q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <q-item-tile stamp>{{ msg.date }}</q-item-tile>
                  <!-- <q-item-tile icon="star" color="yellow" /> -->
                </q-item-side>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="col column">
        <!-- welcome content -->
        <div class="col column" v-if="selectedLength === 0 && !isEditor">
          Select a message to read.
        </div>
        <!-- if seelctedmsg -->
        <div class="col column" v-if="selectedLength !== 0 && !isEditor">
          <div class="col-auto row msg-toolset bg-tertiary text-white" style="height: 45px;">
            <div class="col-auto cursor-pointer" @click="sendMessage">
              <q-icon name="send" />
              Send
            </div>
            <div class="col-auto">
              <q-icon name="attach_file" />
              Attachment
            </div>
            <!-- reply ha nem editor  és nem sent msgs-->
            <div class="col-aut cursor-pointero" v-if="!isEditor && !selectedmessage.to" @click="replyMessage">
              <q-icon name="reply" />
              Reply
            </div>
            <!-- delete if not new -->
            <!-- <div class="col-auto">
              <q-icon name="delete" />
              Delete
            </div> -->
            <!-- forward ha nem editor -->
            <div class="col-aut cursor-pointero">
              <q-icon name="forward" />
              Forward
            </div>
          </div>
          <div class="col-auto row items-center" style="padding: 15px 13px 27px 13px;">
            <div class="col-auto">
              <img src="https://image.flaticon.com/icons/svg/168/168724.svg" alt="avatar" width="70px;" style="max-height: 70px; border-radius: 50%;">
              <!-- ha nics pic -->
              <!-- <q-icon name="face" /> -->
            </div>
            <div class="col" style="padding: 0 10px;">
                <!-- {{ userMessages[selectedmessageInd].from.name }} <br>
                {{ userMessages[selectedmessageInd].to.name }} <br> -->
                <span v-if="selectedmessage.from">{{ selectedmessage.from.name }}</span> <br>
                <!-- {{ selectedmessage.from.name }} <br>
                {{ selectedmessage.to.name }} <br> -->
                <span v-if="selectedmessage.to">{{ selectedmessage.to.name }}</span> <br>
                <!-- <span>{{ selectedmessage.email }}</span> -->
                <span>...email cime...</span>
            </div>
            <div class="col-auto">
              Open profile icon
            </div>
          </div>
          <div class="col-auto " style="padding: 7px; 13px;">
            <table>
              <tr>
                <td>Tárgy:</td>
                <!-- <td style="padding-left: 13px;">{{ userMessages[selectedmessageInd].title }}</td> -->
                <td style="padding-left: 13px;">{{ selectedmessage.title }}</td>
              </tr>
              <tr>
                <td>Date: </td>
                <!-- <td style="padding-left: 13px;">{{ userMessages[selectedmessageInd].date }}</td> -->
                <td style="padding-left: 13px;">{{ selectedmessage.date }}</td>
              </tr>
              <tr>
                <td>Attachments: </td>
                <!-- <td style="padding-left: 13px;">{{ userMessages[selectedmessageInd].attachments.length }}</td> -->
                <td style="padding-left: 13px;">
                  {{ selectedmessage.attachments.length }}
                  <q-icon name="save_alt" class="cursor-pointer" size="20px" v-if="selectedmessage.attachments.length > 0" />
                </td>
              </tr>
            </table>

          </div>
          <!-- <div class="col-auto row no-wrap" v-if="userMessages[selectedmessageInd].attachments.length>0"> -->
          <div class="col-auto row no-wrap" v-if="selectedmessage.attachments.length>0">
            <!-- Message attachments -->
            <!-- <div class="col" v-for="(pic, key) in userMessages[selectedmessageInd].attachments" :key="pic.id"> -->
            <div class="col" v-for="(pic, key) in selectedmessageInd.attachments" :key="pic.id">
              <img class="attachmentImg" :src="pic.img" alt="" @click="downloadImg(key)">
            </div>
          </div>
          <div class="col-auto" style="padding: 13px 7px;">
            <!-- {{ userMessages[selectedmessageInd].text }} -->
            <!-- {{ selectedmessage.text }} -->
            <q-editor v-model="selectedmessage.text" disable/>
          </div>
        </div>

        <!-- new msg editor -->
        <div class="column" v-if="isEditor">
          <div class="col-auto row msg-toolset bg-tertiary text-white" style="height: 45px;">
            <div class="col-auto" @click="sendMessage">
              <q-icon name="send" />
              Send
            </div>
            <div class="col-auto">
              <q-icon name="attach_file" />
              Attachment
            </div>
          </div>
          <div class="" style="padding: 7px 13px; ">
            <div class="">
              <q-chip closable avatar="newMsg.to.img" color="secondary">
                {{ newMsg.to.name }} : {{ newMsg.to.email }}
              </q-chip>
              <q-field v-if="!isReply">
                <q-input v-model="newMsg.to.email" placeholder="" label="this.newMsg.to.name" />
              </q-field>
              <q-field v-if="isReply" disable>
                <q-input v-model="newMsg.to.email" placeholder="" />
              </q-field>
            </div>
            <div class="row items-center" style="margin-bottom: 15px;">
              <div class="" style="padding-right: 20px;">
                Title:
              </div>
              <div class="col">
                <q-field>
                  <q-input v-model="newMsg.title" placeholder="" />
                </q-field>
              </div>
            </div>
            <div class="col">
              <q-editor v-model="newMsg.text"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // name: 'PageName',
  data: () => ({
    userMessages: {},
    sentMessages: {},
    viewList: {},
    selectedmessage: {},
    selectedmessageInd: -1,
    isReply: false,
    isEditor: false,
    replyTo: null,
    isNewMsg: false,
    newMsg: {
      to: {},
      title: '',
      text: '',
      attachments: {},
      date: '2019.03.02'
    }
  }),
  computed: {
    ...mapGetters({
      getMessages: 'doctor/getMessages',
      getSentMessages: 'doctor/getSentMessages',
      getNewMsgId: 'doctor/getHighestSent'
    }),
    selectedLength () {
      return Object.entries(this.selectedmessage).length
    }
  },
  created () {
    this.$store.dispatch('doctor/fetchMessages')
    this.$store.dispatch('doctor/fetchSentMessages')
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.userMessages = this.getMessages
      this.viewList = this.userMessages
      this.sentMessages = this.getSentMessages
      // console.log(this.userMessages)
      // this.userTags = this.getTags
    },
    openMsg (ind) {
      // this.selectedmessageInd = ind
      // entries(obj).length === 0 && obj.constructor === Object
      // console.log('Sel msg: ', Object.entries(ind).length, ind)
      if (this.isNewMsg) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'You have an unsent message, are you sure you want to leave? Your message will be lost.',
          ok: 'Yes',
          cancel: 'No'
        }).then(() => {
          this.isEditor = false
          this.isNewMsg = false
          this.selectedmessage = ind
          // this.$q.notify('Changes has been saved!')
        }).catch(() => {
          // this.cancelEdit()
          // this.$q.notify('Changes has been discarded.')
        })
      } else {
        this.selectedmessage = ind
      }
    },
    viewSent () {
      this.viewList = this.sentMessages
      this.selectedmessage = {}
      console.log('selected sent?')
    },
    viewInbox () {
      this.viewList = this.userMessages
      this.selectedmessage = {}
      console.log('selected inbox')
    },
    downloadImg (ind) {
      console.log('download img', ind, this.selectedmessage.attachments[ind].img)
      var link = document.createElement('a')
      link.style.display = 'none'
      link.target = '_blank'
      document.body.appendChild(link)
      link.href = this.selectedmessageInd.attachments[ind].img
      link.download = 'Filename.jpg'
      link.click()
    },
    newMessage () {
      this.isNewMsg = true
      this.isEditor = true
      console.log('New message', this.isNewMsg)
      this.newMsg.id = this.getNewMsgId
    },
    replyMessage () {
      this.newMessage()
      this.newMsg.to.name = this.selectedmessage.from.name
      this.newMsg.to.email = this.selectedmessage.from.email
      this.newMsg.to.img = this.selectedmessage.from.img
      this.newMsg.title = 'Re: ' + this.selectedmessage.title
      this.newMsg.text = '<br> <br> ----------------------- <br>' + this.selectedmessage.date + '<br>' + this.selectedmessage.text
      this.fetchData()
      console.log('reply', this.newMsg)
    },
    pushNewMessage () {
      console.console.log('Pushed msg: ', this.newMsg)
      this.$store.sentMessages.push(this.newMsg)
    },
    sendMessage () {
      if (this.isEditor) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure you want to send?',
          ok: 'Yes',
          cancel: 'No'
        }).then(() => {
          // this.pushNewMessage()
          console.log('Pushed msg: ', this.newMsg)
          this.$store.sentMessages.push(this.newMsg)
          this.isEditor = false
          this.isNewMsg = false
          this.newMsg = {}
          this.$q.notify('Message has been sent!')
        }).catch(() => {
          // this.cancelEdit()
          // this.$q.notify('Changes has been discarded.')
        })
      } else {
        this.newMessage()
        this.newMsg.to.name = this.selectedmessage.from.name
        this.newMsg.to.email = this.selectedmessage.from.email
        this.newMsg.to.img = this.selectedmessage.from.img
        this.newMsg.title = ''
        this.newMsg.text = ''
        console.log('A kurva anyád', this.newMsg.to.email)
      }
    }
  }
}
</script>

<style strict>
  .msg-left-cont {
    width: 400px !important;
    max-width: 100% !important;
  }
  .attachmentImg {
    max-width: 100%;
    padding: 5px;
    border: 1px solid transparent;
    max-height: 200px;
  }
  .attachmentImg:hover {
    border: 1px solid green;
    cursor: pointer;
  }
  .msg-box {
    border: 2px solid var(--q-color-secondary);
  }
  .msg-toolset {
    height: 45px;
  }
  .msg-toolset > div {
    padding: 12px 15px;
    cursor: pointer;
  }
  .msg-toolset > div:hover {
    background: lightgray;
    color: var(--q-color-secondary);
  }
  .msg-toolset > div > i {
    font-size: 20px;
  }
  .q-list {
    padding: 0;
  }
  tr {
    cursor: normal;
  }
</style>
