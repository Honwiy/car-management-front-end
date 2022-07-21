import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { Subject, Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: SocketIOClient.Socket
  private message: Subject<any> = new Subject<any>()
  constructor() {
    this.socket = io('http://localhost:3001/api/websocket')
    }

  connection() {
    this.socket.on('connection', () => {
      console.log('socket io connected')
    })
  }

  sendSocketMessage(msg: string) {
    msg = 'test websocket'
    this.socket.emit('sendMessage', { message: msg })
  }

  receiveSocketMessage() {
    return this.socket.on('receiveMessage', (data: any) => {
      console.log(data)
    })
  }

}
