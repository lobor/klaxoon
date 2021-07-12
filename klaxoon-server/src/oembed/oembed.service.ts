import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface Video {
  type: string;
  version: string;
  provider_name: string;
  provider_url: string;
  title: string;
  author_name: string;
  author_url: string;
  is_plus: string;
  account_type: string;
  html: string;
  width: number;
  height: number;
  duration: number;
  description: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_url_with_play_button: string;
  upload_date: string;
  video_id: number;
  uri: string;
}

interface Picture {
  type: string;
  flickr_type: string;
  title: string;
  author_name: string;
  author_url: string;
  width: number;
  height: number;
  url: string;
  web_page: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  web_page_short_url: string;
  license: string;
  license_id: number;
  html: string;
  version: string;
  cache_age: number;
  provider_name: string;
}

@Injectable()
export class OembedService {
  public async getVideo(url): Promise<Video> {
    const { data } = await axios.get<Video>(
      `https://vimeo.com/api/oembed.json?url=${url}`,
    );
    return data;
  }

  public async getPicture(url): Promise<Picture> {
    const { data } = await axios.get<Picture>(
      `http://www.flickr.com/services/oembed.json?url=${url}`,
    );
    return data;
  }
}
