import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OembedService } from 'src/oembed/oembed.service';
import { Bookmark, BookmarkDocument } from './bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name)
    private readonly bookmarkModel: Model<BookmarkDocument>,
    private readonly oembedService: OembedService,
  ) {}

  async removeById(_id: string) {
    return this.bookmarkModel.deleteOne({ _id });
  }
  async getById(_id: string) {
    return this.bookmarkModel.findOne({ _id }).exec();
  }
  async updateKeywordsById(_id: string, keywords: string[]) {
    return this.bookmarkModel
      .findOneAndUpdate(
        { _id },
        { $set: { keywords } },
        { returnOriginal: false },
      )
      .exec();
  }

  count() {
    return this.bookmarkModel.countDocuments({});
  }

  async addBookmark(url: string) {
    const isVideo = url.match(/vimeo/i);
    const isPicture = url.match(/flickr/i);
    const bookmarkData: Partial<Bookmark> = { url, createdAt: Date.now() };

    if (isVideo) {
      bookmarkData.type = 'video';
      const data = await this.oembedService.getVideo(url);
      bookmarkData.height = data.height;
      bookmarkData.width = data.width;
      bookmarkData.autor = data.author_name;
      bookmarkData.title = data.title;
      bookmarkData.time = data.duration;
    } else if (isPicture) {
      const data = await this.oembedService.getPicture(url);
      bookmarkData.height = data.height;
      bookmarkData.width = data.width;
      bookmarkData.autor = data.author_name;
      bookmarkData.title = data.title;
      bookmarkData.type = 'picture';
    }

    const bookmark = new this.bookmarkModel(bookmarkData);
    await bookmark.save();
    return bookmark;
  }

  async getAll(limit = 10, page = 1) {
    return this.bookmarkModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }
}
