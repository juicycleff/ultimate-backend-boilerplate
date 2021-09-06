FROM kong/deck

COPY ./.deploy/kong /

ENTRYPOINT [ "/entrypoint.sh" ]
