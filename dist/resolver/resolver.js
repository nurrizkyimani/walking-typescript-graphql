"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const book_1 = require("../entities/book");
let AddBookInput = class AddBookInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddBookInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddBookInput.prototype, "author", void 0);
AddBookInput = __decorate([
    type_graphql_1.InputType()
], AddBookInput);
let Response = class Response {
    constructor(success, message) {
        this.success = success;
        this.message = message;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Response.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Response.prototype, "message", void 0);
Response = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Number, String])
], Response);
let ResponseData = class ResponseData {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ResponseData.prototype, "success", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ResponseData.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", book_1.Book)
], ResponseData.prototype, "data", void 0);
ResponseData = __decorate([
    type_graphql_1.ObjectType()
], ResponseData);
let BookResolver = class BookResolver {
    async readBooks() {
        return book_1.Book.find();
    }
    async readBookById(id) {
        return await book_1.Book.findOne({
            where: {
                id: id
            }
        });
    }
    addBook(newBookData) {
        try {
            book_1.Book.insert(newBookData);
            return new Response(200, "sucesss");
        }
        catch (error) {
            return new Response(400, "failed in the response");
        }
    }
    async deleteBook(id) {
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(book_1.Book)
                .where("id = :id", { id: id })
                .execute();
            return new Response(200, "sucesss");
        }
        catch (error) {
            return new Response(400, "failed in the response");
        }
    }
};
__decorate([
    type_graphql_1.Query(() => [book_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "readBooks", null);
__decorate([
    type_graphql_1.Query(() => book_1.Book),
    __param(0, type_graphql_1.Arg("id", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "readBookById", null);
__decorate([
    type_graphql_1.Mutation(() => Response),
    __param(0, type_graphql_1.Arg("Book")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddBookInput]),
    __metadata("design:returntype", Response)
], BookResolver.prototype, "addBook", null);
__decorate([
    type_graphql_1.Mutation(() => Response),
    __param(0, type_graphql_1.Arg("id", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
BookResolver = __decorate([
    type_graphql_1.Resolver()
], BookResolver);
exports.BookResolver = BookResolver;
